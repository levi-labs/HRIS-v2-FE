export const departmentEndpoints = {
  getAll: () => `${process.env.NEXT_PUBLIC_API_URL}/api/department`,
  create: () => `${process.env.NEXT_PUBLIC_API_URL}/api/department`,
  getOne: (id: string | number) =>
    `${process.env.NEXT_PUBLIC_API_URL}/api/department/${id}`,
  update: (id: string | number) =>
    `${process.env.NEXT_PUBLIC_API_URL}/api/department/${id}`,
  delete: (id: string | number) =>
    `${process.env.NEXT_PUBLIC_API_URL}/api/department/${id}`,
};

export default departmentEndpoints;
