export const validateEmail = (email: string) => {
  const pattern = new RegExp("^[\\w\\d]+@[a-zA-Z_]+?\\.[a-zA-Z]{2,3}$");
  return pattern.test(email);
};
