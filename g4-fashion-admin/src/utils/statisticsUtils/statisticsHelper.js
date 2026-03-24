export const getMonthLabel = (dateString) => {
  const d = new Date(dateString);
  return `T${d.getMonth() + 1}`;
};
export const getRevenueByMonth = (orders) => {
  const map = {};
  orders
    .filter((item) => item.status === "completed")
    .forEach((order) => {
      const month = getMonthLabel(order.createdAt);
      if (!map[month]) {
        map[month] = {
          revenue: 0,
          orders: 0,
        };
      }
      map[month].revenue += order.totalAmount || 0;
      map[month].orders += 1;
    });
  return Object.keys(map).map((month) => ({
    month,
    revenue: map[month].revenue,
    orders: map[month].orders,
  }));
};
export const getTrafficSources = (visits) => {
  const map = {};
  visits.forEach((visit) => {
    const source = visit.source || "Khác";
    if (!map[source]) map[source] = 0;
    map[source] += visit.visits || 0;
  });
  return Object.keys(map).map((key) => ({
    name: key,
    value: map[key],
  }));
};
export const getRevenueByCategory = (orders, categories) => {
  const map = {};
  categories.forEach((category) => {
    map[String(category.id)] = {
      name: category.name,
      revenue: 0,
    };
  });
  orders
    .filter((item) => item.status === "completed")
    .forEach((order) => {
      (order.items || []).forEach((item) => {
        const categoryId = String(item.categoryId);

        if (map[categoryId]) {
          map[categoryId].revenue += (item.price || 0) * (item.quantity || 0);
        }
      });
    });
  return Object.values(map).filter((item) => item.revenue > 0);
};
export const getCustomerStats = (orders, customers) => {
  const DAY_MS = 24 * 60 * 60 * 1000;
  const now = new Date();
  const completedOrders = orders.filter((item) => item.status === "completed");
  const customerOrderStats = {};
  completedOrders.forEach((order) => {
    const customerId = String(order.customerId);
    if (!customerOrderStats[customerId]) {
      customerOrderStats[customerId] = {
        orderCount: 0,
        totalSpent: 0,
      };
    }
    customerOrderStats[customerId].orderCount += 1;
    customerOrderStats[customerId].totalSpent += Number(order.totalAmount || 0);
  });
  let vipCustomers = 0;
  let newCustomers = 0;
  customers.forEach((customer) => {
    const customerId = String(customer.id);
    const stats = customerOrderStats[customerId] || {
      orderCount: 0,
      totalSpent: 0,
    };
    const createdAtRaw = customer.createdAt || customer.updatedAt || null;
    const createdAt = createdAtRaw ? new Date(createdAtRaw) : null;
    const isCreatedWithin10Days =
      createdAt &&
      now - createdAt >= 0 &&
      now - createdAt <= 10 * DAY_MS;
    const isVip =
      stats.orderCount >= 20 && stats.totalSpent > 15000000;
    const isNewCustomer =
      isCreatedWithin10Days && stats.orderCount >= 1;
    if (isVip) {
      vipCustomers += 1;
    }

    if (isNewCustomer) {
      newCustomers += 1;
    }
  });
  const buyers = Object.values(customerOrderStats).filter(
    (item) => item.orderCount > 0
  ).length;
  const returningCustomers = Object.values(customerOrderStats).filter(
    (item) => item.orderCount >= 2
  ).length;
  return {
    totalCustomers: customers.length,
    newCustomers,
    vipCustomers,
    returnRate: buyers
      ? ((returningCustomers / buyers) * 100).toFixed(0)
      : 0,
  };
};
export const getPerformanceStats = (orders, visits, reviews, favorites) => {
  const now = new Date();
  const completedOrders = orders.filter((item) => item.status === "completed");
  const currentMonthOrders = completedOrders.filter((order) => {
    const d = new Date(order.createdAt);
    return (
      d.getMonth() === now.getMonth() &&
      d.getFullYear() === now.getFullYear()
    );
  });
  const pendingOrders = orders.filter((item) => item.status === "pending");
  const totalRevenue = currentMonthOrders.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0
  );
  const totalVisits = visits.reduce(
    (sum, item) => sum + (item.visits || 0),
    0
  );
  return {
    totalRevenue,
    totalOrders: completedOrders.length,
    pendingOrders: pendingOrders.length,
    totalVisits,
    conversionRate: totalVisits
      ? ((completedOrders.length / totalVisits) * 100).toFixed(1)
      : 0,
    totalLikes: favorites.length,
    totalPageviews: totalVisits,
    averageRating: reviews.length
      ? (
          reviews.reduce((sum, item) => sum + (item.rating || 0), 0) /
          reviews.length
        ).toFixed(1)
      : 0,
    averageOrderValue: completedOrders.length
      ? Math.round(
          completedOrders.reduce((sum, o) => sum + (o.totalAmount || 0), 0) /
            completedOrders.length
        )
      : 0,
  };
};
export const getRevenueByDay = (orders) => {
  const now = new Date();
  const map = {};
  orders
    .filter((item) => item.status === "completed")
    .forEach((order) => {
      const d = new Date(order.createdAt);
      if (
        d.getMonth() === now.getMonth() &&
        d.getFullYear() === now.getFullYear()
      ) {
        const day = d.getDate();
        if (!map[day]) {
          map[day] = {
            day: `Ngày ${day}`,
            revenue: 0,
            orders: 0,
          };
        }
        map[day].revenue += order.totalAmount || 0;
        map[day].orders += 1;
      }
    });
  return Object.values(map).sort((a, b) => {
    return (
      parseInt(a.day.replace("Ngày ", ""), 10) -
      parseInt(b.day.replace("Ngày ", ""), 10)
    );
  });
};