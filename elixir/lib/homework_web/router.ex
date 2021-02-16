defmodule HomeworkWeb.Router do
  use HomeworkWeb, :router

  pipeline :api do
    plug(CORSPlug, origin: "http://localhost:3000")
    plug(:accepts, ["json"])
  end

  scope "/" do
    pipe_through(:api)

    forward("/graphiql", Absinthe.Plug.GraphiQL,
      schema: HomeworkWeb.Schema,
      interface: :simple,
      context: %{pubsub: HomeworkWeb.Endpoint}
    )

    forward("/graphql", Absinthe.Plug,
      schema: HomeworkWeb.Schema,
      socket: HomeworkWeb.UserSocket
    )
  end
end
