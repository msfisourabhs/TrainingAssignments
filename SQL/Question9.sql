SELECT DISTINCT (P.FirstName + ' ' + P.MiddleName + ' ' + P.LastName) AS FULL_NAME 
FROM AdventureWorks2012.Person.Person P
WHERE p.BusinessEntityID IN 
	(SELECT Pba.BusinessEntityID FROM AdventureWorks2012.Person.BusinessEntityAddress Pba
	 WHERE Pba.AddressID IN (SELECT Pa.AddressID FROM AdventureWorks2012.Person.Address as Pa
	 WHERE Pa.StateProvinceID = (SELECT Psp.StateProvinceID FROM AdventureWorks2012.Person.StateProvince Psp
	 wHERE Psp.Name = 'Florida') 
	) 
) and (P.FirstName + ' ' + P.MiddleName + ' ' + P.LastName) is not null;