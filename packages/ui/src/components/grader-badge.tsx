import { cn } from "@slugger/ui/lib/utils"

interface GraderBadgeProps {
  grader: string
  grade: string
  className?: string
}

export function GraderBadge({ grader, grade, className }: GraderBadgeProps) {
  const colors: Record<string, string> = {
    PSA: "bg-red-600 text-white",
    BGS: "bg-blue-600 text-white",
    SGC: "bg-green-600 text-white",
  }

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-1 rounded text-xs font-bold",
        colors[grader] || "bg-gray-600 text-white",
        className
      )}
    >
      {grader} {grade}
    </span>
  )
}
