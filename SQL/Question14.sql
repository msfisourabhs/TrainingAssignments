
SELECT COUNT(*) AS Cranksets_sold_in_London
  FROM [AdventureWorks2012].[Sales].[SalesOrderHeader]
  WHERE BillToAddressID IN (SELECT AddressID FROM Person.Address 
  WHERE City = 'London') AND SalesOrderID IN (SELECT SalesOrderID FROM Sales.SalesOrderDetail
  WHERE ProductID IN (SELECT ProductID FROM Production.Product 
  WHERE ProductSubcategoryID = (SELECT ProductSubcategoryID FROM Production.ProductSubcategory
  WHERE Name = 'Cranksets'))) ;