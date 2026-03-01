'use client'

interface GradeFilterProps {
  selectedGraders: string[]
  selectedGrades: string[]
  onGradersChange: (graders: string[]) => void
  onGradesChange: (grades: string[]) => void
}

const graders = ['PSA', 'BGS', 'SGC']
const grades = ['10', '9.5', '9', '8', '7', '6', '5', '4', '3']

export function GradeFilter({
  selectedGraders,
  selectedGrades,
  onGradersChange,
  onGradesChange,
}: GradeFilterProps) {
  const toggleGrader = (grader: string) => {
    if (selectedGraders.includes(grader)) {
      onGradersChange(selectedGraders.filter((g) => g !== grader))
    } else {
      onGradersChange([...selectedGraders, grader])
    }
  }

  const toggleGrade = (grade: string) => {
    if (selectedGrades.includes(grade)) {
      onGradesChange(selectedGrades.filter((g) => g !== grade))
    } else {
      onGradesChange([...selectedGrades, grade])
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-medium mb-2">Grading Company</h4>
        <div className="flex flex-wrap gap-2">
          {graders.map((grader) => (
            <button
              key={grader}
              onClick={() => toggleGrader(grader)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedGraders.includes(grader)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {grader}
            </button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-medium mb-2">Grade</h4>
        <div className="flex flex-wrap gap-2">
          {grades.map((grade) => (
            <button
              key={grade}
              onClick={() => toggleGrade(grade)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedGrades.includes(grade)
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted hover:bg-muted/80'
              }`}
            >
              {grade}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
