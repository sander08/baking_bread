SELECT [C_ID]
      ,[FirstName]
      ,[LastName]
      ,[Login]
      ,[Password]
      ,[Type]
 FROM [MilkDB].[dbo].[Customer]
 WHERE C_ID = @C_ID