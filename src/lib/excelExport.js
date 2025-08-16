import * as XLSX from 'xlsx';

// Function to export employee data to Excel
export const exportEmployeeToExcel = (employee) => {
  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  
  // Prepare data for export
  const employeeData = [
    {
      'الاسم': employee.الاسم || '',
      'الرقم المدني': employee.الرقم_المدني || '',
      'الوظيفة': employee.الوظيفة || '',
      'منطقة العمل': employee.منطقة_العمل || '',
      'مقر العمل': employee.مقر_العمل || '',
      'الجنس': employee.الجنس || '',
      'تاريخ الميلاد': employee.تاريخ_الميلاد || '',
      'الدرجة': employee.الدرجة || '',
      'تاريخ التعيين': employee.تاريخ_التعيين || '',
      'المجموعة النوعية للوظائف': employee.المجموعة_النوعية_للوظائف || '',
      'تاريخ شغل الدرجة': employee.تاريخ_شغل_الدرجة || '',
      'تاريخ شغل الوظيفة': employee.تاريخ_شغل_الوظيفة || '',
      'رقم الهاتف': employee.رقم_الهاتف || '',
      'مواقع العمل': Array.isArray(employee.موقع_العمل) ? employee.موقع_العمل.join(', ') : ''
    }
  ];

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(employeeData, { 
    header: [
      'الاسم',
      'الرقم المدني', 
      'الوظيفة',
      'منطقة العمل',
      'مقر العمل',
      'الجنس',
      'تاريخ الميلاد',
      'الدرجة',
      'تاريخ التعيين',
      'المجموعة النوعية للوظائف',
      'تاريخ شغل الدرجة',
      'تاريخ شغل الوظيفة',
      'رقم الهاتف',
      'مواقع العمل'
    ]
  });

  // Set column widths for better readability
  const columnWidths = [
    { wch: 20 }, // الاسم
    { wch: 15 }, // الرقم المدني
    { wch: 25 }, // الوظيفة
    { wch: 20 }, // منطقة العمل
    { wch: 20 }, // مقر العمل
    { wch: 10 }, // الجنس
    { wch: 15 }, // تاريخ الميلاد
    { wch: 15 }, // الدرجة
    { wch: 15 }, // تاريخ التعيين
    { wch: 25 }, // المجموعة النوعية للوظائف
    { wch: 15 }, // تاريخ شغل الدرجة
    { wch: 15 }, // تاريخ شغل الوظيفة
    { wch: 15 }, // رقم الهاتف
    { wch: 30 }  // مواقع العمل
  ];
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'بيانات الموظف');

  // Generate filename with employee name and current date
  const currentDate = new Date().toISOString().split('T')[0];
  const fileName = `بيانات_الموظف_${employee.الاسم || 'غير_محدد'}_${currentDate}.xlsx`;

  // Export the file
  XLSX.writeFile(workbook, fileName);
};

// Function to export all employees to Excel
export const exportAllEmployeesToExcel = (employees) => {
  // Create workbook and worksheet
  const workbook = XLSX.utils.book_new();
  
  // Prepare data for export - using full employee data from database
  const employeesData = employees.map(employee => ({
    'الاسم': employee.الاسم || employee.name || '',
    'الرقم المدني': employee.الرقم_المدني || employee.civilId || '',
    'الوظيفة': employee.الوظيفة || employee.position || '',
    'منطقة العمل': employee.منطقة_العمل || employee.department || '',
    'مقر العمل': employee.مقر_العمل || employee.workLocation || '',
    'الجنس': employee.الجنس || employee.gender || '',
    'تاريخ الميلاد': employee.تاريخ_الميلاد ? new Date(employee.تاريخ_الميلاد).toLocaleDateString('ar-SA') : employee.birthDate || '',
    'الدرجة': employee.الدرجة || employee.grade || '',
    'تاريخ التعيين': employee.تاريخ_التعيين ? new Date(employee.تاريخ_التعيين).toLocaleDateString('ar-SA') : employee.hireDate || '',
    'المجموعة النوعية للوظائف': employee.المجموعة_النوعية_للوظائف || employee.jobGroup || '',
    'تاريخ شغل الدرجة': employee.تاريخ_شغل_الدرجة ? new Date(employee.تاريخ_شغل_الدرجة).toLocaleDateString('ar-SA') : employee.gradeDate || '',
    'تاريخ شغل الوظيفة': employee.تاريخ_شغل_الوظيفة ? new Date(employee.تاريخ_شغل_الوظيفة).toLocaleDateString('ar-SA') : employee.positionDate || '',
    'رقم الهاتف': employee.رقم_الهاتف || employee.contactNumber || employee.phone || '',
    'مواقع العمل': Array.isArray(employee.موقع_العمل) ? employee.موقع_العمل.join(', ') : 
                   Array.isArray(employee.workLocations) ? employee.workLocations.join(', ') : 
                   employee.workLocations || '',
    'تاريخ الإنشاء': employee.createdAt ? new Date(employee.createdAt).toLocaleDateString('ar-SA') : '',
    'تاريخ التحديث': employee.updatedAt ? new Date(employee.updatedAt).toLocaleDateString('ar-SA') : ''
  }));

  // Create worksheet
  const worksheet = XLSX.utils.json_to_sheet(employeesData, { 
    header: [
      'الاسم',
      'الرقم المدني',
      'الوظيفة',
      'منطقة العمل',
      'مقر العمل',
      'الجنس',
      'تاريخ الميلاد',
      'الدرجة',
      'تاريخ التعيين',
      'المجموعة النوعية للوظائف',
      'تاريخ شغل الدرجة',
      'تاريخ شغل الوظيفة',
      'رقم الهاتف',
      'مواقع العمل',
      'تاريخ الإنشاء',
      'تاريخ التحديث'
    ]
  });

  // Set column widths
  const columnWidths = [
    { wch: 20 }, // الاسم
    { wch: 15 }, // الرقم المدني
    { wch: 25 }, // الوظيفة
    { wch: 20 }, // منطقة العمل
    { wch: 20 }, // مقر العمل
    { wch: 10 }, // الجنس
    { wch: 15 }, // تاريخ الميلاد
    { wch: 15 }, // الدرجة
    { wch: 15 }, // تاريخ التعيين
    { wch: 25 }, // المجموعة النوعية للوظائف
    { wch: 15 }, // تاريخ شغل الدرجة
    { wch: 15 }, // تاريخ شغل الوظيفة
    { wch: 15 }, // رقم الهاتف
    { wch: 30 }, // مواقع العمل
    { wch: 15 }, // تاريخ الإنشاء
    { wch: 15 }  // تاريخ التحديث
  ];
  worksheet['!cols'] = columnWidths;

  // Add worksheet to workbook
  XLSX.utils.book_append_sheet(workbook, worksheet, 'قاعدة بيانات الموظفين');

  // Generate filename with current date
  const currentDate = new Date().toISOString().split('T')[0];
  const fileName = `قاعدة_بيانات_الموظفين_${currentDate}.xlsx`;

  // Export the file
  XLSX.writeFile(workbook, fileName);
};
