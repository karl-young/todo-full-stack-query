//@vitest-environment jsdom
import { describe, it, expect } from "vitest";
import { renderRoute } from "../../test/setup";
import nock from "nock"
import { waitFor, within } from "@testing-library/react";

describe("TaskList", () => {
  it("should render a list of tasks", async () => {
    const scope = nock("http://localhost")
    .get("/api/v1/tasks")
    .reply(200, {
      tasks: [
        {
          id: 65,
          task: "Cleaning",
          completed: false,
        },
        {
          id: 66,
          task: "Dusting",
          completed: false,
        },
      ],
    })
    
    const { user, ...screen } = renderRoute("/")

    await waitFor(() => {
      expect(screen.queryByText("Cleaning")).not.toBeInTheDocument(
        
      )
    })
  })
}
