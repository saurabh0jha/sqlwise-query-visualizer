import { NewQueryDialog } from "@/sections/dialog/NewQueryDialog";

const InitialView = () => {
  return (
    <main className="box-border flex grow mx-4 mt-8 mb-4 flex-col gap-4">
      <h1 className="mx-4 text-2xl font-bold mb-4">Welcome</h1>
      <h1 className="mx-4 text-xl">
        QueryWise is a tool that allows you to create and manage queries.
      </h1>
      <ul className="mx-4 px-4 text-lg list-disc">
        <li className="list-disc mb-2">
          <NewQueryDialog type="link" />
        </li>
        <li className="list-disc mb-2">
          Select one from the sidebar to get started.
        </li>
      </ul>
      <div className="flex justify-start p-0 m-0"></div>
    </main>
  );
};

export default InitialView;
