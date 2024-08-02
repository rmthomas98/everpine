export const filterSearch = (search, role, invites) => {
  if (!search && role === "all") return invites;
  if (search && role !== "all") {
    return invites.filter(
      (invite) =>
        invite.email.toLowerCase().includes(search.toLowerCase()) &&
        invite.role === role.toUpperCase(),
    );
  }
  if (search) {
    return invites.filter((invite) =>
      invite.email.toLowerCase().includes(search.toLowerCase()),
    );
  }
  if (role !== "all") {
    return invites.filter((invite) => invite.role === role.toUpperCase());
  }
};
