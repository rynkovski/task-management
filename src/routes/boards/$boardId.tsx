import { Container } from "@chakra-ui/react";
import { FileRoute } from "@tanstack/react-router";

export const Route = new FileRoute('/boards/$boardId').createRoute({
  // In a loader
  loader: ({ params }) => params.boardId,
  // Or in a component
  component: BoardComponent,
});

function BoardComponent() {
  const { boardId } = Route.useParams();
  return (
    <Container size="lg" variant="colorful" colorScheme="blue">
      Board ID: {boardId}{" "}
    </Container>
  );
}
