import { useState, useMemo } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "@/components/ui/search";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, User, Shield, UserCheck, UserX, Plus, Eye, RefreshCw, Edit2, Trash2, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/_authenticated/users")({
  component: UsersManagementPage,
});

const initialMockUsers = [
  { id: 1, status: "inactive", name: "Kathryn Murphy", email: "admin@ragdalion.com", role: "Super Admin", avatar: "https://i.pravatar.cc/150?u=1" },
  { id: 2, status: "active", name: "Hasan Waulat", email: "admin@ragdalion.com", role: "Super Admin", avatar: "https://i.pravatar.cc/150?u=2" },
  { id: 3, status: "active", name: "Albert Flores", email: "admin@ragdalion.com", role: "Super Admin", avatar: "https://i.pravatar.cc/150?u=3" },
  { id: 4, status: "active", name: "Theresa Webb", email: "admin@ragdalion.com", role: "Super Admin", avatar: "https://i.pravatar.cc/150?u=4" },
  { id: 5, status: "active", name: "Brooklyn Simmons", email: "admin@ragdalion.com", role: "Super Admin", avatar: "https://i.pravatar.cc/150?u=5" },
  { id: 6, status: "active", name: "Annette Black", email: "admin@ragdalion.com", role: "Admin", avatar: "https://i.pravatar.cc/150?u=6" },
  { id: 7, status: "active", name: "Marvin McKinney", email: "admin@ragdalion.com", role: "Admin", avatar: "https://i.pravatar.cc/150?u=7" },
  { id: 8, status: "active", name: "Arlene McCoy", email: "admin@ragdalion.com", role: "User", avatar: "https://i.pravatar.cc/150?u=8" },
  { id: 9, status: "active", name: "Eleanor Pena", email: "admin@ragdalion.com", role: "User", avatar: "https://i.pravatar.cc/150?u=9" },
  { id: 10, status: "active", name: "Guy Hawkins", email: "admin@ragdalion.com", role: "Admin", avatar: "https://i.pravatar.cc/150?u=10" },
  { id: 11, status: "active", name: "Jenny Wilson", email: "admin@ragdalion.com", role: "Manager", avatar: "https://i.pravatar.cc/150?u=11" },
  { id: 12, status: "inactive", name: "Robert Fox", email: "admin@ragdalion.com", role: "User", avatar: "https://i.pravatar.cc/150?u=12" },
];

const mockRoles = [
  { id: 1, name: "Super Admin", count: 2 },
  { id: 2, name: "Admin", count: 4 },
  { id: 3, name: "PIC", count: 4 },
  { id: 4, name: "Manager", count: 4 },
];

function UsersManagementPage() {
  const [activeTab, setActiveTab] = useState<"users" | "roles">("users"); 
  
  // States for Users Tab
  const [users, setUsers] = useState(initialMockUsers);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Derived state for Filtering
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRole = roleFilter === "all" || user.role.toLowerCase().replace(/\s/g, '') === roleFilter.toLowerCase();
      return matchesSearch && matchesRole;
    });
  }, [users, searchQuery, roleFilter]);

  // Derived state for Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const toggleUserStatus = (userId: number) => {
    setUsers(users.map(u => u.id === userId ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u));
  };

  return (
    <div className="flex-1 flex flex-col space-y-4 p-4 lg:p-6 bg-slate-50 dark:bg-slate-900 h-full overflow-y-auto transition-colors">
      
      {/* Header */}
      <div className="flex flex-col pb-2 shrink-0 space-y-1">
        <div className="flex items-center gap-2 text-xl font-bold tracking-tight text-slate-800 dark:text-slate-100">
          <Users className="w-6 h-6" />
          <h2>Users Management</h2>
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Manage users, roles, and permissions</p>
      </div>

      {/* Top Tabs Card */}
      <Card className="flex items-center bg-white dark:bg-slate-800 shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl px-2 h-14 overflow-hidden shrink-0 transition-colors">
        <div className="flex h-full">
          <button 
            onClick={() => setActiveTab("users")}
            className={`flex items-center gap-2 h-full px-4 sm:px-6 border-b-[3px] font-semibold text-sm transition-colors ${
              activeTab === "users" 
                ? "border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20" 
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
            }`}
          >
            <User className="w-4 h-4" /> User Account
          </button>
          <button 
            onClick={() => setActiveTab("roles")}
            className={`flex items-center gap-2 h-full px-4 sm:px-6 border-b-[3px] font-semibold text-sm transition-colors ${
              activeTab === "roles" 
                ? "border-blue-600 dark:border-blue-500 text-blue-700 dark:text-blue-400 font-bold bg-blue-50/50 dark:bg-blue-900/20" 
                : "border-transparent text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700/50"
            }`}
          >
            <Shield className="w-4 h-4" /> Role Permissions
          </button>
        </div>
      </Card>

      {/* TAB CONTENT: USER ACCOUNT */}
      {activeTab === "users" && (
        <div className="flex flex-col space-y-4 h-full">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 shrink-0">
            <Card className="p-5 flex items-center gap-5 border-slate-100 dark:border-slate-700/50 shadow-sm rounded-xl bg-white dark:bg-slate-800 transition-colors">
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400 shrink-0">
                <Users className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-slate-400 dark:text-slate-500 text-[13px] font-semibold tracking-wide mb-1 uppercase">Total Users</p>
                <p className="text-3xl font-extrabold text-slate-900 dark:text-white leading-none">{users.length}</p>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-5 border-slate-100 dark:border-slate-700/50 shadow-sm rounded-xl bg-white dark:bg-slate-800 transition-colors">
              <div className="w-12 h-12 rounded-full bg-green-50 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400 shrink-0">
                <UserCheck className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-slate-400 dark:text-slate-500 text-[13px] font-semibold tracking-wide mb-1 uppercase">Active Users</p>
                <p className="text-3xl font-extrabold text-green-600 dark:text-green-400 leading-none">{users.filter(u => u.status === 'active').length}</p>
              </div>
            </Card>
            <Card className="p-5 flex items-center gap-5 border-slate-100 dark:border-slate-700/50 shadow-sm rounded-xl bg-white dark:bg-slate-800 transition-colors">
              <div className="w-12 h-12 rounded-full bg-orange-50 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400 shrink-0">
                <UserX className="w-6 h-6" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-slate-400 dark:text-slate-500 text-[13px] font-semibold tracking-wide mb-1 uppercase">Inactive Users</p>
                <p className="text-3xl font-extrabold text-orange-600 dark:text-orange-400 leading-none">{users.filter(u => u.status === 'inactive').length}</p>
              </div>
            </Card>
          </div>

          <Card className="flex-1 flex flex-col shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl overflow-hidden bg-white dark:bg-slate-800 min-h-[500px] transition-colors">
            {/* Toolbar */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-center gap-3 bg-white dark:bg-slate-800 shrink-0">
              <div className="flex-1 w-full">
                <Search 
                  placeholder="Search by username or email" 
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="dark:bg-slate-900 dark:border-slate-700"
                />
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <Select value={roleFilter} onValueChange={(val) => { setRoleFilter(val); setCurrentPage(1); }}>
                  <SelectTrigger className="w-full sm:w-[140px] bg-white dark:bg-slate-900 h-10 border-slate-200 dark:border-slate-700">
                    <SelectValue placeholder="Role" />
                  </SelectTrigger>
                  <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                    <SelectItem value="all">All Role</SelectItem>
                    <SelectItem value="superadmin">Super Admin</SelectItem>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="pic">PIC</SelectItem>
                    <SelectItem value="manager">Manager</SelectItem>
                    <SelectItem value="user">User</SelectItem>
                  </SelectContent>
                </Select>
                <Button className="h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto justify-start sm:justify-center font-medium rounded-lg">
                  <Plus className="w-4 h-4 mr-2" />
                  Create New User
                </Button>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="bg-white dark:bg-slate-800 sticky top-0 z-10 shadow-[0_1px_0_0_#f1f5f9] dark:shadow-[0_1px_0_0_#334155]">
                  <TableRow className="border-none hover:bg-transparent">
                    <TableHead className="w-[180px] font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 text-center">
                      Action
                    </TableHead>
                    <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 cursor-pointer">
                      <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
                        Status <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 cursor-pointer">
                      <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
                        Username <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                      </div>
                    </TableHead>
                    <TableHead className="font-semibold text-xs text-slate-500 dark:text-slate-400 uppercase py-4 cursor-pointer">
                      <div className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors">
                        Role <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />
                      </div>
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {paginatedUsers.length > 0 ? paginatedUsers.map((row) => (
                    <TableRow key={row.id} className="border-b border-slate-50 dark:border-slate-700/30 hover:bg-slate-50/50 dark:hover:bg-slate-700/20 group transition-colors">
                      <TableCell className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <Button variant="iconView" title="View"><Eye /></Button>
                          <Button variant="icon" title="Refresh" className="!w-8 !h-8 !p-0 dark:border-slate-700 dark:hover:bg-slate-700"><RefreshCw className="!w-[17px] !h-[17px]" /></Button>
                          <Button variant="iconEdit" title="Edit"><Edit2 /></Button>
                          <Button variant="iconDelete" title="Delete"><Trash2 /></Button>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Switch 
                            checked={row.status === 'active'} 
                            onCheckedChange={() => toggleUserStatus(row.id)}
                            className="data-[state=checked]:bg-blue-600 dark:data-[state=checked]:bg-blue-500 data-[state=unchecked]:bg-slate-300 dark:data-[state=unchecked]:bg-slate-600"
                          />
                          <span className="text-[13px] font-semibold text-slate-700 dark:text-slate-300 capitalize w-14">{row.status}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3 py-1">
                          <Avatar className="w-9 h-9 border border-slate-100 dark:border-slate-700">
                            <AvatarImage src={row.avatar} />
                            <AvatarFallback className="bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-bold">{row.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <span className="text-sm font-bold text-slate-800 dark:text-slate-100">{row.name}</span>
                            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">{row.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-600 dark:text-slate-300 font-medium text-[13px]">{row.role}</TableCell>
                    </TableRow>
                  )) : (
                    <TableRow>
                      <TableCell colSpan={4} className="py-8 text-center text-slate-500 dark:text-slate-400">
                        No users found matching the filters.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Footer Pagination */}
            <div className="p-4 border-t border-slate-100 dark:border-slate-700/50 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-800 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                  <span>Rows per page:</span>
                  <Select value={itemsPerPage.toString()} onValueChange={(val) => { setItemsPerPage(Number(val)); setCurrentPage(1); }}>
                    <SelectTrigger className="w-16 h-8 bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 px-2 text-center text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-slate-800 dark:border-slate-700">
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <span className="text-sm text-slate-500 dark:text-slate-400">
                  {filteredUsers.length === 0 ? '0-0 of 0' : `${(currentPage - 1) * itemsPerPage + 1}-${Math.min(currentPage * itemsPerPage, filteredUsers.length)} of ${filteredUsers.length}`}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="w-8 h-8 p-0 rounded border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                {Array.from({ length: totalPages || 1 }).map((_, i) => (
                  <Button 
                    key={i} 
                    variant={currentPage === i + 1 ? "default" : "outline"} 
                    onClick={() => setCurrentPage(i + 1)}
                    className={`w-8 h-8 p-0 rounded ${
                      currentPage === i + 1 
                        ? "bg-blue-600 text-white hover:bg-blue-700" 
                        : "border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 dark:bg-slate-800"
                    }`}
                  >
                    {i + 1}
                  </Button>
                ))}
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentPage(p => Math.min(totalPages || 1, p + 1))}
                  disabled={currentPage === totalPages || totalPages === 0}
                  className="w-8 h-8 p-0 rounded border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 dark:bg-slate-800 dark:hover:bg-slate-700 disabled:opacity-50"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}

      {/* TAB CONTENT: ROLE PERMISSIONS */}
      {activeTab === "roles" && (
        <div className="flex gap-4 lg:gap-6 flex-col md:flex-row flex-1">
          {/* Left Panel */}
          <div className="w-full md:w-[340px] shrink-0 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-slate-800 dark:text-slate-100 text-lg">Roles</h3>
              <Button className="h-9 px-4 bg-[#2A5298] hover:bg-[#1a3c75] text-white font-medium rounded-lg shadow-sm">
                <Plus className="w-4 h-4 mr-1.5" />
                Create New Role
              </Button>
            </div>
            
            <div className="space-y-3">
              {mockRoles.map((role, idx) => (
                <div key={role.id} className={`flex items-center justify-between p-4 rounded-xl border transition-colors ${idx === 0 ? 'bg-[#3157A4] border-[#3157A4] text-white shadow-md' : 'bg-slate-50 dark:bg-slate-800 border-slate-100 dark:border-slate-700 text-slate-800 dark:text-slate-200'}`}>
                  <div className="flex flex-col">
                    <span className="font-semibold text-base">{role.name}</span>
                    <span className={`text-[13px] ${idx === 0 ? 'text-blue-100' : 'text-slate-500 dark:text-slate-400'}`}>{role.count} users</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className={`w-[34px] h-[34px] rounded-lg flex items-center justify-center transition-colors ${idx === 0 ? 'bg-transparent text-white border border-white/50 hover:bg-white/10' : 'bg-[#3157A4] hover:bg-[#1a3c75] text-white shadow-sm'}`}>
                      <Edit2 className="w-[16px] h-[16px]" />
                    </button>
                    <button className="w-[34px] h-[34px] rounded-lg flex items-center justify-center bg-red-500 hover:bg-red-600 text-white shadow-sm transition-colors">
                      <Trash2 className="w-[16px] h-[16px]" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Panel */}
          <Card className="flex-1 p-6 lg:p-8 shadow-sm border-slate-100 dark:border-slate-700/50 rounded-xl bg-white dark:bg-slate-800 overflow-hidden flex flex-col h-fit min-h-[500px] transition-colors">
            <div className="mb-8">
              <h3 className="text-2xl font-bold text-slate-800 dark:text-white mb-1">Super Admin</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">Configure access by module</p>
            </div>

            <div className="overflow-x-auto flex-1">
              <table className="w-full text-sm text-left border-collapse">
                <thead className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase border-b border-slate-100 dark:border-slate-700 bg-white dark:bg-slate-800">
                  <tr>
                    <th className="py-4 px-2 min-w-[160px]">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-slate-700 dark:hover:text-slate-200">
                        FITUR <ChevronDown className="w-3.5 h-3.5 text-slate-300 dark:text-slate-500" />
                      </div>
                    </th>
                    <th className="py-4 px-2 text-center w-[120px]">ALL ACCESS</th>
                    <th className="py-4 px-2 text-center w-[100px]">CREATE</th>
                    <th className="py-4 px-2 text-center w-[100px]">UPDATE</th>
                    <th className="py-4 px-2 text-center w-[100px]">DELETE</th>
                    <th className="py-4 px-2 text-center w-[120px]">ONLY VIEW</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/50">
                  {[
                    { name: 'Dashboard', all: true, create: false, update: false, delete: false, view: false },
                    { name: 'Daily Progres', all: true, create: true, update: true, delete: true, view: false },
                    { name: 'Reports', all: true, create: false, update: false, delete: false, view: false },
                    { name: 'All Master Data', all: true, create: true, update: true, delete: true, view: false },
                    { name: 'Users Management', all: true, create: true, update: true, delete: true, view: false },
                  ].map((row, i) => (
                    <tr key={i} className="hover:bg-slate-50/50 dark:hover:bg-slate-700/20 transition-colors">
                      <td className="py-5 px-2 font-medium text-slate-700 dark:text-slate-300 text-[13px]">{row.name}</td>
                      <td className="py-5 px-2 text-center">
                        <div className="flex justify-center">
                          <Checkbox checked={row.all} className="w-5 h-5 rounded-[4px] border-slate-300 dark:border-slate-600 data-[state=checked]:bg-[#2A5298] data-[state=checked]:border-[#2A5298]" />
                        </div>
                      </td>
                      <td className="py-5 px-2 text-center">
                        <div className="flex justify-center">
                          {row.create && <Checkbox checked className="w-5 h-5 rounded-[4px] border-slate-300 dark:border-slate-600 data-[state=checked]:bg-[#2A5298] data-[state=checked]:border-[#2A5298]" />}
                        </div>
                      </td>
                      <td className="py-5 px-2 text-center">
                        <div className="flex justify-center">
                          {row.update && <Checkbox checked className="w-5 h-5 rounded-[4px] border-slate-300 dark:border-slate-600 data-[state=checked]:bg-[#2A5298] data-[state=checked]:border-[#2A5298]" />}
                        </div>
                      </td>
                      <td className="py-5 px-2 text-center">
                        <div className="flex justify-center">
                          {row.delete && <Checkbox checked className="w-5 h-5 rounded-[4px] border-slate-300 dark:border-slate-600 data-[state=checked]:bg-[#2A5298] data-[state=checked]:border-[#2A5298]" />}
                        </div>
                      </td>
                      <td className="py-5 px-2 text-center">
                        <div className="flex justify-center">
                          {row.view ? (
                            <Checkbox checked className="w-5 h-5 rounded-[4px] border-slate-300 dark:border-slate-600 data-[state=checked]:bg-[#2A5298] data-[state=checked]:border-[#2A5298]" />
                          ) : (
                            <div className="w-5 h-5 rounded-[4px] bg-slate-100 dark:bg-slate-800 border border-slate-100 dark:border-slate-800"></div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      )}

    </div>
  );
}
