import Link from "next/link";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import AppLogo from "@/components/app-logo";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { User, LogOut, Settings } from "lucide-react";

const Header = () => {
  const userAvatar = PlaceHolderImages.find(p => p.id === 'user-avatar');

  return (
    <header className="sticky top-0 z-50 flex h-16 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 md:px-6">
      <Link href="/" className="flex items-center gap-2 font-semibold">
        <AppLogo className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold tracking-tight text-primary">ResolveIt</span>
      </Link>
      <div className="ml-auto flex items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="rounded-full">
              {userAvatar && (
                <Image
                  src={userAvatar.imageUrl}
                  width={40}
                  height={40}
                  alt={userAvatar.description}
                  data-ai-hint={userAvatar.imageHint}
                  className="rounded-full"
                />
              )}
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Settings className="mr-2 h-4 w-4" />
              <span>Settings</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Log out</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
