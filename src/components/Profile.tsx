import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const Profile = () => {
  return (
    <div className="p-4 border-b border-gray-200">
      <div className="flex items-center gap-3">
        <Avatar className="size-10">
          <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
          <AvatarFallback>U</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm text-gray-800 font-medium">John Doe</p>
          <p className="text-xs text-gray-500">Cashier</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;