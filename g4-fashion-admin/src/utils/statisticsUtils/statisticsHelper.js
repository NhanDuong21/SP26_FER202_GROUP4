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
      if (!map[month]) map[month] = 0;
      map[month] += order.totalAmount || 0;
    });

  return Object.keys(map).map((month) => ({
    month,
    revenue: map[month],
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
  const completedOrders = orders.filter((item) => item.status === "completed");
  const orderCountMap = {};

  completedOrders.forEach((order) => {
    const customerId = String(order.customerId);
    if (!orderCountMap[customerId]) orderCountMap[customerId] = 0;
    orderCountMap[customerId] += 1;
  });

  const buyers = Object.keys(orderCountMap).length;
  const vipCustomers = Object.values(orderCountMap).filter(
    (count) => count >= 2,
  ).length;

  const now = new Date();
  const newCustomers = customers.filter((customer) => {
    const d = new Date(customer.createdAt);
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
  }).length;

  return {
    totalCustomers: customers.length,
    newCustomers,
    vipCustomers,
    returnRate: buyers ? ((vipCustomers / buyers) * 100).toFixed(0) : 0,
  };
};

export const getPerformanceStats = (orders, visits, reviews, favorites) => {
  const completedOrders = orders.filter((item) => item.status === "completed");

  const totalRevenue = completedOrders.reduce(
    (sum, item) => sum + (item.totalAmount || 0),
    0,
  );

  const totalVisits = visits.reduce(
    (sum, item) => sum + (item.visits || 0),
    0,
  );

  return {
    totalRevenue,
    totalOrders: orders.length,
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
      ? Math.round(totalRevenue / completedOrders.length)
      : 0,
  };
};