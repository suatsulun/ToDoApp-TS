import { useState } from "react";
import { useFamily } from "../hooks/useFamily";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useAuth } from "../hooks/useAuth";
import { LogOut, Mail, UserPlus, Users } from "lucide-react";

const FamilyTab = () => {
  const {
    hasFamily,
    invitations,
    members,
    createFamily,
    leaveFamily,
    sendInvite,
    acceptInvite,
    declineInvite,
  } = useFamily();

  const { user } = useAuth();
  const [nameInput, setNameInput] = useState("");

  if (hasFamily) {
    return (
      <div className="space-y-6">
        <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/25">
                <Users className="h-5 w-5" />
              </div>
              <div>
                <h2 className="text-lg font-semibold tracking-tight">
                  Your Family
                </h2>
                <p className="text-sm text-muted-foreground">
                  {members.length} member{members.length === 1 ? "" : "s"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={leaveFamily}
              className="gap-1.5 border-rose-200 bg-rose-50/40 text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300 dark:hover:bg-rose-500/20"
            >
              <LogOut className="h-4 w-4" />
              Leave Family
            </Button>
          </div>

          <ul className="m-0 list-none space-y-2 p-0">
            {members.map((member) => {
              const isMe = member.id === user?.id;
              const initial = (member.username?.[0] ?? "?").toUpperCase();
              return (
                <li
                  key={member.id}
                  className="flex items-center justify-between gap-3 rounded-xl border border-border/60 bg-background/60 p-3"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-sm font-semibold text-white shadow-sm">
                      {initial}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-medium">{member.username}</span>
                      <span className="text-xs text-muted-foreground">
                        {member.email}
                      </span>
                    </div>
                  </div>
                  {isMe && (
                    <span className="shrink-0 rounded-full bg-violet-100 px-3 py-1 text-xs font-semibold text-violet-700 dark:bg-violet-500/20 dark:text-violet-300">
                      You
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300">
              <UserPlus className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-semibold">Invite Someone</h3>
              <p className="text-sm text-muted-foreground">
                Send an invitation by username or email.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input
              placeholder="Username or Email"
              value={nameInput}
              onChange={(e) => setNameInput(e.target.value)}
            />
            <Button
              className="gap-1.5"
              onClick={async () => {
                const ok = await sendInvite(nameInput);
                if (ok) {
                  toast.success("Invite sent!");
                  setNameInput("");
                }
              }}
            >
              <Mail className="h-4 w-4" />
              Send Invite
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-md shadow-violet-500/25">
            <Users className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Create a Family
            </h2>
            <p className="text-sm text-muted-foreground">
              Invite people to share your todos.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-2 sm:flex-row">
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

      <div className="rounded-2xl border border-border/60 bg-card/80 p-6 shadow-sm backdrop-blur-sm md:p-8">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-300">
            <Mail className="h-5 w-5" />
          </div>
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Invitations
            </h2>
            <p className="text-sm text-muted-foreground">
              {invitations.length === 0
                ? "You have no pending invitations."
                : `You have ${invitations.length} pending invitation${invitations.length === 1 ? "" : "s"}.`}
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {invitations.map((inv) => (
            <div
              key={inv.id}
              className="flex flex-col justify-between gap-3 rounded-xl border border-border/60 bg-background/60 p-3 sm:flex-row sm:items-center"
            >
              <span className="text-sm">
                Invitation to{" "}
                <span className="font-semibold">{inv.family_name}</span> family
                by{" "}
                <span className="font-semibold">{inv.sender_username}</span>
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
    </div>
  );
};

export default FamilyTab;
