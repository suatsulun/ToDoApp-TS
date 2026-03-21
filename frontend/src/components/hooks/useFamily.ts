import { useState, useEffect } from "react";
import { useAuth } from "./useAuth";
import { API_BASE_URL } from "../../config/constants";
import { type FamilyMember, type Invitation } from "../../types/family";




export const useFamily = () => {
    const { user, token, login } = useAuth();
    const hasFamily = !!user?.family_id;

    const [invitations, setInvitations] = useState<Invitation[]>([]);
    const [members, setMembers] = useState<FamilyMember[]>([]);

    const fetchInvitations = async () => {
      if (hasFamily) return;

      try {
        const response = await fetch(
          `${API_BASE_URL}/api/families/invitations/me`,
          {
            headers: { Authorization: `Bearer ${token}` },
          },
        );
        if (response.ok) {
          const data = await response.json();
          setInvitations(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const fetchMembers = async (): Promise<void> => {
      if (!hasFamily) return;
      try {
        const response = await fetch(`${API_BASE_URL}/api/families/members`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.ok) {
          const data = await response.json();
          setMembers(data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    const refreshUser = async () => {
    const response = await fetch(`${API_BASE_URL}/api/families/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (response.ok) {
      const updatedUser = await response.json();
      login(updatedUser, token!);
    }
  };

  useEffect(() => {
    if (hasFamily) {
      fetchMembers();
    } else {
      fetchInvitations();
    }
  }, [hasFamily, token]);

  const createFamily = async (name: string): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/families`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ name }),
      });
      if (response.ok) {
        await refreshUser();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const leaveFamily = async (): Promise<boolean> => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/families/leave`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (response.ok) {
        await refreshUser();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const sendInvite = async (identifier: string): Promise<boolean> => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/families/invitations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ identifier }),
      });
      return res.ok;
    } catch (error) {
      return false;
    }
  };

  const acceptInvite = async (invitationId: number): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/families/invitations/${invitationId}/accept`,
        {
          method: "POST",
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      if (response.ok) {
        await refreshUser();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  const declineInvite = async (invitationId: number): Promise<boolean> => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/families/invitations/${invitationId}/decline`,
        {
          method: "DELETE", 
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.ok) {
        await fetchInvitations();
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  };

  return {
    members,
    hasFamily,
    invitations,
    refreshUser,
    createFamily,
    leaveFamily,
    sendInvite,
    acceptInvite,
    declineInvite,
  };
};;
