# Diff Details

Date : 2025-07-24 17:17:59

Directory d:\\react-projects\\the-wild-oasis-ts

Total : 63 files,  3789 codes, 9 comments, 384 blanks, all 4182 lines

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details

## Files
| filename | language | code | comment | blank | total |
| :--- | :--- | ---: | ---: | ---: | ---: |
| [components.json](/components.json) | JSON | 0 | 0 | 1 | 1 |
| [package.json](/package.json) | JSON | 3 | 0 | 0 | 3 |
| [pnpm-lock.yaml](/pnpm-lock.yaml) | YAML | 1,222 | 0 | 92 | 1,314 |
| [src/App.tsx](/src/App.tsx) | TypeScript JSX | 11 | 0 | 0 | 11 |
| [src/components/AvatarImageUploader.tsx](/src/components/AvatarImageUploader.tsx) | TypeScript JSX | 85 | 0 | 6 | 91 |
| [src/components/ui/avatar.tsx](/src/components/ui/avatar.tsx) | TypeScript JSX | 46 | 0 | 6 | 52 |
| [src/components/ui/card.tsx](/src/components/ui/card.tsx) | TypeScript JSX | 83 | 0 | 10 | 93 |
| [src/components/ui/login-form.tsx](/src/components/ui/login-form.tsx) | TypeScript JSX | 130 | 0 | 5 | 135 |
| [src/components/ui/radio-group.tsx](/src/components/ui/radio-group.tsx) | TypeScript JSX | 39 | 0 | 5 | 44 |
| [src/features/authentication/UpdatePasswordForm.tsx](/src/features/authentication/UpdatePasswordForm.tsx) | TypeScript JSX | 81 | 0 | 7 | 88 |
| [src/features/authentication/UpdateUserDataForm.tsx](/src/features/authentication/UpdateUserDataForm.tsx) | TypeScript JSX | 73 | 0 | 8 | 81 |
| [src/features/authentication/useLogin.ts](/src/features/authentication/useLogin.ts) | TypeScript | 19 | 0 | 4 | 23 |
| [src/features/authentication/useLogout.ts](/src/features/authentication/useLogout.ts) | TypeScript | 15 | 0 | 4 | 19 |
| [src/features/authentication/useSignup.ts](/src/features/authentication/useSignup.ts) | TypeScript | 16 | 0 | 3 | 19 |
| [src/features/authentication/users/CreateUserForm.tsx](/src/features/authentication/users/CreateUserForm.tsx) | TypeScript JSX | 187 | 0 | 9 | 196 |
| [src/features/authentication/users/UserColumns.tsx](/src/features/authentication/users/UserColumns.tsx) | TypeScript JSX | 149 | 0 | 6 | 155 |
| [src/features/authentication/users/UserFormDialog.tsx](/src/features/authentication/users/UserFormDialog.tsx) | TypeScript JSX | 31 | 0 | 3 | 34 |
| [src/features/authentication/users/UsersDataTable.tsx](/src/features/authentication/users/UsersDataTable.tsx) | TypeScript JSX | 125 | 2 | 12 | 139 |
| [src/features/authentication/users/UsersTableOperations.tsx](/src/features/authentication/users/UsersTableOperations.tsx) | TypeScript JSX | 29 | 0 | 3 | 32 |
| [src/features/authentication/users/useDeleteUser.ts](/src/features/authentication/users/useDeleteUser.ts) | TypeScript | 14 | 0 | 3 | 17 |
| [src/features/authentication/users/useUpdateUser.ts](/src/features/authentication/users/useUpdateUser.ts) | TypeScript | 15 | 0 | 4 | 19 |
| [src/features/authentication/users/useUser.ts](/src/features/authentication/users/useUser.ts) | TypeScript | 22 | 0 | 4 | 26 |
| [src/features/authentication/users/useUsers.ts](/src/features/authentication/users/useUsers.ts) | TypeScript | 35 | 1 | 5 | 41 |
| [src/features/bookings/BookingColumns.tsx](/src/features/bookings/BookingColumns.tsx) | TypeScript JSX | 35 | 0 | 3 | 38 |
| [src/features/bookings/BookingDataBox.tsx](/src/features/bookings/BookingDataBox.tsx) | TypeScript JSX | 99 | 0 | 10 | 109 |
| [src/features/bookings/BookingDetail.tsx](/src/features/bookings/BookingDetail.tsx) | TypeScript JSX | 94 | 0 | 10 | 104 |
| [src/features/bookings/BookingFormDialog.tsx](/src/features/bookings/BookingFormDialog.tsx) | TypeScript JSX | 39 | 0 | 4 | 43 |
| [src/features/bookings/BookingsDataTable.tsx](/src/features/bookings/BookingsDataTable.tsx) | TypeScript JSX | -7 | -1 | -3 | -11 |
| [src/features/bookings/CreateBookingForm.tsx](/src/features/bookings/CreateBookingForm.tsx) | TypeScript JSX | 30 | 0 | 5 | 35 |
| [src/features/bookings/useBooking.ts](/src/features/bookings/useBooking.ts) | TypeScript | 26 | 0 | 3 | 29 |
| [src/features/bookings/useBookings.ts](/src/features/bookings/useBookings.ts) | TypeScript | 40 | 0 | 4 | 44 |
| [src/features/bookings/useDeleteBooking.ts](/src/features/bookings/useDeleteBooking.ts) | TypeScript | 17 | 0 | 2 | 19 |
| [src/features/cabins/CabinColumns.tsx](/src/features/cabins/CabinColumns.tsx) | TypeScript JSX | 1 | 0 | 0 | 1 |
| [src/features/cabins/CabinsDataTable.tsx](/src/features/cabins/CabinsDataTable.tsx) | TypeScript JSX | 0 | 1 | 0 | 1 |
| [src/features/cabins/CreateCabinForm.tsx](/src/features/cabins/CreateCabinForm.tsx) | TypeScript JSX | 0 | -6 | 0 | -6 |
| [src/features/cabins/ImageUpload.tsx](/src/features/cabins/ImageUpload.tsx) | TypeScript JSX | 0 | -1 | 0 | -1 |
| [src/features/check-in-out/CheckinBooking.tsx](/src/features/check-in-out/CheckinBooking.tsx) | TypeScript JSX | 121 | 0 | 14 | 135 |
| [src/features/check-in-out/useCheckin.ts](/src/features/check-in-out/useCheckin.ts) | TypeScript | 29 | 0 | 3 | 32 |
| [src/features/check-in-out/useCheckout.ts](/src/features/check-in-out/useCheckout.ts) | TypeScript | 16 | 0 | 3 | 19 |
| [src/hooks/use-file-upload.ts](/src/hooks/use-file-upload.ts) | TypeScript | 345 | 13 | 53 | 411 |
| [src/hooks/useMoveBack.ts](/src/hooks/useMoveBack.ts) | TypeScript | 5 | 0 | 2 | 7 |
| [src/hooks/useSortableColumn.ts](/src/hooks/useSortableColumn.ts) | TypeScript | 32 | 4 | 9 | 45 |
| [src/hooks/useSortableColumn.tsx](/src/hooks/useSortableColumn.tsx) | TypeScript JSX | -32 | -4 | -9 | -45 |
| [src/pages/Account.tsx](/src/pages/Account.tsx) | TypeScript JSX | 20 | 0 | 3 | 23 |
| [src/pages/Booking.tsx](/src/pages/Booking.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [src/pages/Bookings.tsx](/src/pages/Bookings.tsx) | TypeScript JSX | 13 | 1 | 1 | 15 |
| [src/pages/Checkin.tsx](/src/pages/Checkin.tsx) | TypeScript JSX | 4 | 0 | 2 | 6 |
| [src/pages/Login.tsx](/src/pages/Login.tsx) | TypeScript JSX | 7 | 0 | 1 | 8 |
| [src/pages/Users.tsx](/src/pages/Users.tsx) | TypeScript JSX | 27 | 0 | 3 | 30 |
| [src/services/apiAuth.ts](/src/services/apiAuth.ts) | TypeScript | 106 | 3 | 28 | 137 |
| [src/services/apiBookings.ts](/src/services/apiBookings.ts) | TypeScript | 52 | 0 | 11 | 63 |
| [src/services/supabase.ts](/src/services/supabase.ts) | TypeScript | 3 | 0 | 2 | 5 |
| [src/ui/ClientPagination.tsx](/src/ui/ClientPagination.tsx) | TypeScript JSX | 98 | 0 | 5 | 103 |
| [src/ui/DarkModeToggle.tsx](/src/ui/DarkModeToggle.tsx) | TypeScript JSX | 9 | 0 | 2 | 11 |
| [src/ui/DataItem.tsx](/src/ui/DataItem.tsx) | TypeScript JSX | 17 | 0 | 3 | 20 |
| [src/ui/DataTablePagination.tsx](/src/ui/DataTablePagination.tsx) | TypeScript JSX | -135 | -2 | -11 | -148 |
| [src/ui/DeleteConfirmationDialog.tsx](/src/ui/DeleteConfirmationDialog.tsx) | TypeScript JSX | 2 | 0 | 0 | 2 |
| [src/ui/FilterInput.tsx](/src/ui/FilterInput.tsx) | TypeScript JSX | 0 | -2 | 0 | -2 |
| [src/ui/Flag.tsx](/src/ui/Flag.tsx) | TypeScript JSX | 5 | 0 | 1 | 6 |
| [src/ui/Header.tsx](/src/ui/Header.tsx) | TypeScript JSX | 5 | 0 | 1 | 6 |
| [src/ui/HeaderMenu.tsx](/src/ui/HeaderMenu.tsx) | TypeScript JSX | 108 | 0 | 4 | 112 |
| [src/ui/ProtectedRoute.tsx](/src/ui/ProtectedRoute.tsx) | TypeScript JSX | 23 | 0 | 5 | 28 |
| [src/ui/ServerPagination.tsx](/src/ui/ServerPagination.tsx) | TypeScript JSX | 101 | 0 | 8 | 109 |

[Summary](results.md) / [Details](details.md) / [Diff Summary](diff.md) / Diff Details