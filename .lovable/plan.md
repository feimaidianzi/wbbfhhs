

# Reset Admin Password

## Task
Reset the password for admin account `guanliyuan@caniuav.com` to `7758258www`.

## Approach
Create a temporary backend function that uses the admin API to update the user's password, then call it to perform the reset.

## Steps

1. **Create a temporary edge function** `reset-admin-password` that:
   - Uses the Supabase service role key to call `auth.admin.updateUserById()`
   - Sets the new password for the specified user
   - Returns success/failure status

2. **Deploy and invoke** the function to reset the password

3. **Verify** by testing login at `/admin/login` with the new credentials

4. **Clean up** by removing the temporary edge function after successful reset

## Security Note
- The edge function will be deleted immediately after use
- The password will be securely hashed by the authentication system

