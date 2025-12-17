import { showToast } from "@/components/toaster";
import { Button } from "@/components/ui/button";
import { usePermission } from "@/hooks/usePermission";
import { useUpdateUserStatusMutation } from "@/store/Api/userApi";
import { User } from "@/types/user";
interface Props {
  data: User;
}
export const UserStatusCellAction = ({ data }: Props) => {
  const [Update, { isLoading }] = useUpdateUserStatusMutation();
  const canEdit = usePermission("user:update");
  const handleUpdate = async () => {
    try {
      const responseData = await Update({ id: data.id }).unwrap();
      showToast({
        title: responseData.message,
        type: "success",
      });
    } catch (error: any) {
      if (error?.data?.message) {
        showToast({
          title: error.data.message,
          type: "error",
        });
      } else {
        showToast({
          title: "Something went wrong!",
          type: "error",
        });
      }
    }
  };
  return (
    <div>
      <Button onClick={handleUpdate} disabled={isLoading || !canEdit}>
        Confirm
      </Button>
    </div>
  );
};
