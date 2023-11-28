import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { User } from "../../service/AuthService";

interface AvatarProps {
  user: User;
  size: number;
}

const Avatar: React.FC<AvatarProps> = ({ user, size }) => {
  return (
    <Image
      source={{
        uri: user.profilePicture,
      }}
      style={{
        width: size,
        height: size,
        borderRadius: 50,
      }}
    />
  );
};

export default Avatar;
