"use client";

import { useState } from "react";
import { motion, LayoutGroup } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, XCircle } from "lucide-react";

interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string;
}

const users: User[] = [
  {
    id: "1",
    name: "John Doe",
    email: "john.doe@example.com",
    avatarUrl: "/placeholder.svg?height=48&width=48&text=JD",
  },
  {
    id: "2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    avatarUrl: "/placeholder.svg?height=48&width=48&text=JS",
  },
  {
    id: "3",
    name: "Alice Brown",
    email: "alice.brown@example.com",
    avatarUrl: "/placeholder.svg?height=48&width=48&text=AB",
  },
  {
    id: "4",
    name: "Bob White",
    email: "bob.white@",
    avatarUrl: "/placeholder.svg?height=48&width=48&text=BW",
  },
];

export default function Avatars() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex items-center justify-start px-2">
      <div
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="relative py-4"
      >
        <LayoutGroup>
          <motion.div
            layout
            className={`flex items-center ${isExpanded ? "gap-1" : ""}`}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {isExpanded && (
              <motion.div
                layoutId="add-button"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-white-800 flex h-6 w-6 flex-shrink-0 items-center justify-center text-black"
              >
                <PlusCircle className="h-5 w-5" />
              </motion.div>
            )}

            {users.map((user, index) => (
              <motion.div
                key={user.id}
                layout
                className={`flex items-center overflow-hidden rounded-full ${
                  isExpanded
                    ? "gap-1 bg-gray-200 py-0.5 pr-2 pl-1"
                    : "border-2 border-white"
                } ${!isExpanded && index > 0 ? "-ml-1.5" : ""}`}
                style={{ zIndex: users.length - index }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              >
                <Avatar className="h-5 w-5 flex-shrink-0">
                  <AvatarImage src={user.avatarUrl} alt={user.name} />
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>

                <motion.div
                  initial={{ opacity: 0, maxWidth: 0 }}
                  animate={{
                    opacity: isExpanded ? 1 : 0,
                    maxWidth: isExpanded ? "200px" : 0,
                    marginLeft: isExpanded ? "0.3rem" : 0,
                  }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  className="flex items-center gap-1"
                >
                  <span className="text-sm font-medium whitespace-nowrap text-gray-800">
                    {user.email}
                  </span>
                  <XCircle className="h-4 w-4 cursor-pointer text-gray-600" />
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </LayoutGroup>
      </div>
    </div>
  );
}
