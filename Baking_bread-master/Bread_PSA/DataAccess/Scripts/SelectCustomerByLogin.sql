SELECT
    [C_ID],
    [Password],
    [Type]
FROM [MilkDB].[dbo].[Customer]
WHERE [Login] = @Login