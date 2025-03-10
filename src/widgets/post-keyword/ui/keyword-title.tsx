export interface KeywordTitleProps {
  label: string
  icon: React.FC<React.SVGProps<SVGSVGElement>>
}

export const KeywordTitle: React.FC<KeywordTitleProps> = ({ label, icon: Icon }) => (
  <h3 className="mb-2 flex items-center justify-start px-1 font-medium text-gray-500 dark:text-gray-400">
    <Icon className="mr-2" />
    {label}
  </h3>
)
