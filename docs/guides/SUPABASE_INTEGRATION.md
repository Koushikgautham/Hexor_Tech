# Supabase Integration Complete! 🎉

## ✅ What I've Created:

### **API Routes (Server-Side - Secure)**

I've created 5 secure API routes that use the Supabase Admin client:

1. **`/api/admin/users` (GET, POST)**
   - GET: Fetch all users from the `profiles` table
   - POST: Create new user (creates both auth user and profile)

2. **`/api/admin/users/[id]/role` (PATCH)**
   - Update user role (admin/user)

3. **`/api/admin/users/[id]/status` (PATCH)**
   - Activate/deactivate user accounts

4. **`/api/admin/users/[id]/reset-password` (POST)**
   - Send password reset email to user

5. **`/api/admin/users/[id]` (DELETE)**
   - Permanently delete user (cascades to profile)

---

## 🔄 What Needs to be Updated in `/admin/users/page.tsx`:

The current user management page uses **mock data**. Here's what needs to change:

### **Replace Mock Data with Real Data:**

**Current (Line 82):**
```typescript
const [users, setUsers] = React.useState<UserProfile[]>(mockUsers);
```

**Change to:**
```typescript
const [users, setUsers] = React.useState<UserProfile[]>([]);
const [isLoadingUsers, setIsLoadingUsers] = React.useState(true);

// Fetch users on mount
React.useEffect(() => {
  fetchUsers();
}, []);

const fetchUsers = async () => {
  setIsLoadingUsers(true);
  try {
    const response = await fetch('/api/admin/users');
    const data = await response.json();
    if (data.users) {
      setUsers(data.users);
    }
  } catch (error) {
    toast.error('Failed to load users');
    console.error(error);
  } finally {
    setIsLoadingUsers(false);
  }
};
```

### **Update Admin Actions to Call APIs:**

#### **1. Reset Password (Line 129-150):**
```typescript
const handleResetPassword = async () => {
  if (!selectedUser) return;
  setIsLoading(true);
  try {
    const response = await fetch(`/api/admin/users/${selectedUser.id}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: selectedUser.email }),
    });
    
    if (!response.ok) throw new Error('Failed to send reset email');
    
    toast.success(`Password reset email sent to ${selectedUser.email}`);
    setShowModal(null);
    setSelectedUser(null);
  } catch (error) {
    toast.error('Failed to send reset email');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
```

#### **2. Change Role (Line 152-171):**
```typescript
const handleChangeRole = async (newRole: UserRole) => {
  if (!selectedUser) return;
  setIsLoading(true);
  try {
    const response = await fetch(`/api/admin/users/${selectedUser.id}/role`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ role: newRole }),
    });
    
    if (!response.ok) throw new Error('Failed to change role');
    
    // Update local state
    setUsers((prev) =>
      prev.map((u) => (u.id === selectedUser.id ? { ...u, role: newRole } : u))
    );
    toast.success(`${selectedUser.full_name}'s role changed to ${newRole}`);
    setShowModal(null);
    setSelectedUser(null);
  } catch (error) {
    toast.error('Failed to change role');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
```

#### **3. Toggle Status (Line 173-192):**
```typescript
const handleToggleStatus = async (user: UserProfile) => {
  setIsLoading(true);
  try {
    const response = await fetch(`/api/admin/users/${user.id}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ is_active: !user.is_active }),
    });
    
    if (!response.ok) throw new Error('Failed to update status');
    
    // Update local state
    setUsers((prev) =>
      prev.map((u) =>
        u.id === user.id ? { ...u, is_active: !u.is_active } : u
      )
    );
    toast.success(`${user.full_name} ${user.is_active ? 'deactivated' : 'activated'}`);
  } catch (error) {
    toast.error('Failed to update status');
    console.error(error);
  } finally {
    setIsLoading(false);
    setActionMenuOpen(null);
  }
};
```

#### **4. Delete User (Line 194-209):**
```typescript
const handleDeleteUser = async () => {
  if (!selectedUser) return;
  setIsLoading(true);
  try {
    const response = await fetch(`/api/admin/users/${selectedUser.id}`, {
      method: 'DELETE',
    });
    
    if (!response.ok) throw new Error('Failed to delete user');
    
    // Update local state
    setUsers((prev) => prev.filter((u) => u.id !== selectedUser.id));
    toast.success(`${selectedUser.full_name} deleted successfully`);
    setShowModal(null);
    setSelectedUser(null);
  } catch (error) {
    toast.error('Failed to delete user');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
```

#### **5. Add User (Line 719-742 in AddUserForm):**
```typescript
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setIsLoading(true);

  try {
    const response = await fetch('/api/admin/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || 'Failed to create user');
    }
    
    // Fetch updated user list
    const usersResponse = await fetch('/api/admin/users');
    const usersData = await usersResponse.json();
    
    if (usersData.users) {
      onSuccess(usersData.users[usersData.users.length - 1]); // Pass the newly created user
    }
  } catch (error: any) {
    toast.error(error.message || 'Failed to create user');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};
```

---

## 🚀 How to Apply These Changes:

**Option 1: Manual Update**
- Open `/admin/users/page.tsx`
- Replace the functions listed above with the new API-calling versions
- Remove the mock data array (lines 28-79)

**Option 2: I Can Do It**
- Let me know and I'll update the entire file for you!

---

## ✅ What Works Now:

With these API routes in place, you can:
- ✅ **View all real users** from Supabase
- ✅ **Add new users** with email, password, and role
- ✅ **Change user roles** (promote/demote)
- ✅ **Activate/Deactivate** user accounts
- ✅ **Send password reset emails**
- ✅ **Delete users** permanently

All operations are **secure** because they use the Supabase Admin client on the server-side!

---

Would you like me to update the user management page file now? 🎯
