import { getCurrentUser } from "@/app/server-actions/getCurrentUser";
import { adminClient } from "@/lib/supabase/admin";
import { NextRequest, NextResponse } from "next/server";

interface Params {
  params: Promise<{ id: string }>;
}

export async function DELETE(_req: NextRequest, { params }: Params) {
  try {
    const { id } = await params;

    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    //Prevent self delete

    if (user.id === id) {
      return NextResponse.json(
        { error: "You cannot delete your own account" },
        { status: 400 },
      );
    }

    const { error } = await adminClient.auth.admin.deleteUser(id);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ success: true });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
