function Header() {
  return (
    <header className="flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
      <div>
        <h2 className="text-xl font-semibold text-slate-800">
          Hệ thống quản trị G4 FASHION
        </h2>
        <p className="text-sm text-slate-500">Quản lý cửa hàng thời trang</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="rounded-full bg-slate-100 px-4 py-2 text-sm text-slate-700">
          Xin chào, Admin
        </div>
      </div>
    </header>
  );
}

export default Header;
