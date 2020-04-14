INSERT INTO [MilkDB].[dbo].[Customer]
    ([FirstName]
      ,[LastName]
      ,[Login]
      ,[Password]
      ,[Type])
VALUES(
      @FirstName,
      @LastName,
      @CustomerLogin,
      @PasswordHash,
      @CustomerType)
SELECT CAST(SCOPE_IDENTITY() as int)