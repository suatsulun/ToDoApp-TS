import { useState } from "react";
import { useFamily } from "../hooks/useFamily";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";

const FamilyTab = () => {
  const { 
    hasFamily, 
    invitations,
    members, 
    createFamily, 
    leaveFamily, 
    sendInvite, 
    acceptInvite, 
    declineInvite 
  } = useFamily();

  const { user } = useAuth();

  const [nameInput, setNameInput] = useState("");

  return hasFamily ? (
    <div className="space-y-6">
      <div className="p-6 bg-white border rounded-xl shadow-sm w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Your Family Dashboard</h2>
          <Button variant="destructive" onClick={leaveFamily}>
            Leave Family
          </Button>
        </div>
        <div className="w-full">
          <h3 className="font-semibold mb-3 text-lg">Family Members</h3>
          <ul className="space-y-3 pl-0 m-0 w-full list-none">
            {members.map((member) => (
              <li key={member.id} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg border w-full">
                <div className="flex flex-col text-left">
                  <span className="font-medium text-gray-900">{member.username}</span>
                  <span className="text-xs text-gray-500">{member.email}</span>
                </div>
                {member.id === user?.id && (
                  <span className="text-xs font-bold bg-blue-100 text-blue-800 px-3 py-1 rounded-full shrink-0">
                    You
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <h3 className="font-semibold mb-4">Invite Someone</h3>
        <div className="flex gap-2">
          <Input
            placeholder="Username or Email"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <Button
            onClick={async () => {
              const ok = await sendInvite(nameInput);
              if (ok) {
                toast.success("Invite sent!");
                setNameInput("");
              }
            }}
          >
            Send Invite
          </Button>
        </div>
      </div>
    </div>
  ) : (
    <div className="space-y-6">
      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">Create a Family</h2>
        <div className="flex gap-2">
          <Input
            placeholder="Family Name"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
          <Button
            onClick={async () => {
              const ok = await createFamily(nameInput);
              if (ok) toast.success("Family created!");
              setNameInput("");
            }}
          >
            Create
          </Button>
        </div>
      </div>

      <div className="p-6 bg-white border rounded-xl shadow-sm">
        <h2 className="text-xl font-bold mb-4">Invitations</h2>
        {invitations.map((inv) => (
          <div
            key={inv.id}
            className="flex justify-between items-center border-b py-2"
          >
            <span className="text-sm font-medium text-gray-700">
              Invitation to <span className="font-bold">{inv.family_name}</span>{" "}
              family by <span className="font-bold">{inv.sender_username}</span>
            </span>
            <div className="flex gap-2">
              <Button size="sm" onClick={() => acceptInvite(inv.id)}>
                Accept
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={() => declineInvite(inv.id)}
              >
                Decline
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FamilyTab;