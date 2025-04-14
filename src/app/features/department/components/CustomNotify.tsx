import React from "react";

export default function CustomNotify({
  title,
  message,
}: {
  title: string;
  message: string;
}) {
  return (
    <div>
      <h4>{title}</h4>
      <p>{message}</p> {/* Bisa menampilkan lebih banyak data di sini */}
    </div>
  );
}
