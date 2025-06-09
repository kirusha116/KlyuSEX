import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export function MyDialog({
  isOpen,
  onOpenChange,
  title,
  description,
  content,
  footer,
}: {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center text-2xl text-primary">
            {title}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter className="mr-[8%] mt-4">{footer}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
