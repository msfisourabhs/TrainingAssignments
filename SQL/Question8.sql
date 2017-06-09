SELECT COUNT(Suffix) AS No_Of_Employees_With_Valid_Suffix 
FROM [AdventureWorks2012].[HumanResources].vEmployee
WHERE Suffix IS NOT NULL;