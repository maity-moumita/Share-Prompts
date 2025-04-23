import { Suspense } from "react";
import UpdatePromptClient from "./UpdatePromptClient";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading prompt...</div>}>
      <UpdatePromptClient />
    </Suspense>
  );
}