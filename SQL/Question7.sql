SELECT TOP 1 ntLevel 
FROM master.dbo.tblEmp
WHERE moSalary >= (SELECT AVG(moSalary) FROM master.dbo.tblEmp);