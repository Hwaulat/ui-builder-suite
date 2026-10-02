import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated/master-data")({
  component: MasterDataLayout,
});

function MasterDataLayout() {
  return (
    <Outlet />
  );
}
