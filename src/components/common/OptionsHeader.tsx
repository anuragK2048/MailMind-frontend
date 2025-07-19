import { useUserStore } from "@/store/UserStore";

function OptionsHeader() {
  const userEmails = useUserStore((store) => store.userEmails);
  return (
    <div>
      {userEmails?.map((val, i) => (
        <div key={i}>{val.email}</div>
      ))}
    </div>
  );
}

export default OptionsHeader;
