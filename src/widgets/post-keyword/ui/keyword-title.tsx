export interface KeywordTitleProps {
  label: string
  icon: (props: React.SVGProps<SVGSVGElement>) => React.ReactNode
}

export const KeywordTitle: React.FC<KeywordTitleProps> = ({ label, icon: Icon }) => (
  <h3 className="mb-2 flex items-center justify-start px-1 font-medium text-zinc-500 dark:text-zinc-400">
    <Icon className="mr-2" />
    {label}
  </h3>
)
