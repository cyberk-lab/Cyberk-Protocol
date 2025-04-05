
// Function to generate a random Vietnamese name
export function generateRandomName(): string {
  const firstNames = [
    "Nguyễn", "Trần", "Lê", "Phạm", "Hoàng", "Huỳnh", "Phan", "Vũ", "Võ", "Đặng",
    "Bùi", "Đỗ", "Hồ", "Ngô", "Dương", "Lý"
  ];
  
  const middleNames = [
    "Văn", "Thị", "Đức", "Minh", "Hoàng", "Hữu", "Quang", "Công", "Thanh", "Thái",
    "Quốc", "Tuấn", "Hồng", "Thành", "Xuân", "Bảo"
  ];
  
  const lastNames = [
    "Anh", "Bách", "Cường", "Dũng", "Đạt", "Giang", "Hải", "Hiếu", "Hùng", "Khoa",
    "Linh", "Mai", "Nam", "Phong", "Quân", "Sơn", "Thắng", "Trung", "Tú", "Vinh"
  ];
  
  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
  const middleName = middleNames[Math.floor(Math.random() * middleNames.length)];
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
  
  return `${firstName} ${middleName} ${lastName}`;
}

// Generate a random salary between min and max
export function generateRandomSalary(min: number = 12000000, max: number = 100000000): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate 30 random users
export function generateRandomUsers(count: number = 30): Array<{
  id: number;
  name: string;
  salary: number;
  isActive: boolean;
}> {
  return Array.from({ length: count }, (_, index) => ({
    id: index + 1,
    name: generateRandomName(),
    salary: generateRandomSalary(),
    isActive: true
  }));
}
