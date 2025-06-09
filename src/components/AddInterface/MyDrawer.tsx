import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
export function MyDrawer({
  isOpen,
  onOpenChange,
  //
  title,
  description,
  content,
  footer,
}: {
  isOpen: boolean;
  onOpenChange: (state: boolean) => void;
  //
  title: string;
  description?: string;
  content?: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <Drawer open={isOpen} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-center text-2xl text-primary">
            {title}
          </DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {content}
        <DrawerFooter>{footer}</DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
