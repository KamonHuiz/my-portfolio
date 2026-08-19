import type { ReactNode } from "react";

/**
 * Bọc một khối nội dung để nó trôi lên nhẹ khi trang tải.
 * delay tính bằng giây, ví dụ delay={0.1}
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <div className={`rise ${className}`} style={{ animationDelay: `${delay}s` }}>
      {children}
    </div>
  );
}
