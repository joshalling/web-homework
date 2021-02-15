# Script for populating the database. You can run it as:
#
#     mix run priv/repo/seeds.exs
#
# Inside the script, you can read and write to any of your
# repositories directly:
#
#     Homework.Repo.insert!(%Homework.SomeSchema{})
#
# We recommend using the bang functions (`insert!`, `update!`
# and so on) as they will fail if something goes wrong.

merchant_1 = Homework.Repo.insert!(%Homework.Merchants.Merchant{name: "Merchant 1", description: "Merchant 1 is really good"})
merchant_2 = Homework.Repo.insert!(%Homework.Merchants.Merchant{name: "Merchant 2", description: "Merchant 2 is just ok"})
merchant_3 = Homework.Repo.insert!(%Homework.Merchants.Merchant{name: "Merchant 3", description: "Merchant 3 is not so good"})

user_1 = Homework.Repo.insert!(%Homework.Users.User{first_name: "John", last_name: "Doe", dob: "1998-07-21"})
user_2 = Homework.Repo.insert!(%Homework.Users.User{first_name: "Jane", last_name: "Doe", dob: "2000-03-18"})

Enum.each(1..10, fn i ->
  credit = Enum.random([true, false])
  user_id = Enum.random([user_1, user_2]).id
  merchant_id = Enum.random([merchant_1, merchant_2, merchant_3]).id
  Homework.Repo.insert!(%Homework.Transactions.Transaction{
    amount: Enum.random(500..10000),
    credit: credit,
    debit: !credit,
    description: "Transaction Number #{i}",
    user_id: user_id,
    merchant_id: merchant_id
  })
end
)
