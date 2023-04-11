export const addFieldsOnUsersData = (users) => {
  return users.map((user) => {
    user.show = true;
    user.selected = false;
    return user;
  });
};
