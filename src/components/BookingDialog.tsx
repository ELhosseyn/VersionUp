import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const bookingSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  company: z.string().min(1, "Company is required"),
  role: z.string().min(1, "Role is required"),
  industry: z.string().min(1, "Industry is required"),
  useCase: z.string().min(1, "Use case is required"),
  challenge: z.string().min(1, "Please describe your main challenge"),
});

type BookingForm = z.infer<typeof bookingSchema>;

interface BookingDialogProps {
  children: React.ReactNode;
}

export const BookingDialog = ({ children }: BookingDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    try {
      // Store in Supabase (assuming bookings table exists)
      const { error } = await supabase
        .from('bookings')
        .insert([{
          ...data,
          created_at: new Date().toISOString(),
        }]);

      if (error) throw error;

      toast.success("Demo scheduled successfully! Check your email for confirmation.");
      setOpen(false);
      form.reset();
    } catch (error) {
      console.error("Booking error:", error);
      toast.error("Failed to schedule demo. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Schedule Your Demo</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="form" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="form">Contact Form</TabsTrigger>
            <TabsTrigger value="calendar">Calendar Booking</TabsTrigger>
          </TabsList>
          <TabsContent value="form" className="space-y-4">
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Name *</Label>
                  <Input
                    id="name"
                    {...form.register("name")}
                    placeholder="Your full name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    {...form.register("email")}
                    placeholder="your@email.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                  )}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company">Company *</Label>
                  <Input
                    id="company"
                    {...form.register("company")}
                    placeholder="Company name"
                  />
                  {form.formState.errors.company && (
                    <p className="text-sm text-red-500">{form.formState.errors.company.message}</p>
                  )}
                </div>
                <div>
                  <Label htmlFor="role">Role *</Label>
                  <Input
                    id="role"
                    {...form.register("role")}
                    placeholder="Your position"
                  />
                  {form.formState.errors.role && (
                    <p className="text-sm text-red-500">{form.formState.errors.role.message}</p>
                  )}
                </div>
              </div>
              
              <div>
                <Label htmlFor="industry">Industry *</Label>
                <Select onValueChange={(value) => form.setValue("industry", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your industry" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                    <SelectItem value="military">Military</SelectItem>
                    <SelectItem value="retail">Retail</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                {form.formState.errors.industry && (
                  <p className="text-sm text-red-500">{form.formState.errors.industry.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="useCase">Specific Use Case *</Label>
                <Textarea
                  id="useCase"
                  {...form.register("useCase")}
                  placeholder="Describe how you plan to use our platform"
                  rows={3}
                />
                {form.formState.errors.useCase && (
                  <p className="text-sm text-red-500">{form.formState.errors.useCase.message}</p>
                )}
              </div>
              
              <div>
                <Label htmlFor="challenge">Main Training Challenge *</Label>
                <Textarea
                  id="challenge"
                  {...form.register("challenge")}
                  placeholder="What's your biggest challenge with current training methods?"
                  rows={2}
                />
                {form.formState.errors.challenge && (
                  <p className="text-sm text-red-500">{form.formState.errors.challenge.message}</p>
                )}
              </div>
              
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? "Scheduling..." : "Submit & Schedule Demo"}
              </Button>
            </form>
          </TabsContent>
          <TabsContent value="calendar" className="space-y-4">
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">
                Choose a convenient time for your personalized demo
              </p>
              {/* Calendly embed - replace with your actual Calendly link */}
              <div className="bg-muted rounded-lg p-8 text-center">
                <p className="text-sm text-muted-foreground">
                  Calendly integration would go here.
                  <br />
                  Replace with actual Calendly embed code.
                </p>
                <Button className="mt-4" onClick={() => window.open('https://calendly.com', '_blank')}>
                  Open Calendly
                </Button>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};