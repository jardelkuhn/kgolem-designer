export type SidebarProps = Readonly<{
  onSave: () => void;
  onCreate: () => void;
  onRestore: (uuid: string) => void;
  onDelete: (uuid: string) => void;
}>;
