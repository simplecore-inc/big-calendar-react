"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useDisclosure } from "@/hooks/use-disclosure";

import { Form } from "@/components/old-ui/form";
import { Input } from "@/components/old-ui/input";
import { Select } from "@/components/old-ui/select";
import { Dialog } from "@/components/old-ui/dialog";
import { Button } from "@/components/old-ui/button";
import { Textarea } from "@/components/old-ui/textarea";
import { TimeInput } from "@/components/old-ui/time-input";
import { SingleDayPickerInput } from "@/components/old-ui/single-day-picker-input";

import { eventSchema } from "@/calendar/schemas";

import type { TimeValue } from "react-aria-components";
import type { TEventFormData } from "@/calendar/schemas";

interface IProps {
  children: React.ReactNode;
  startDate?: Date;
  startTime?: { hour: number; minute: number };
}

export function AddEventDialog({ children, startDate, startTime }: IProps) {
  const { isOpen, onClose, onToggle } = useDisclosure();

  const form = useForm<TEventFormData>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      startDate: typeof startDate !== "undefined" ? startDate : undefined,
      startTime: typeof startTime !== "undefined" ? startTime : undefined,
    },
  });

  const onSubmit = (_values: TEventFormData) => {
    // This is just and example of how to use the form. In a real application, you would call the API to create the event.
    onClose();
    form.reset();
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onToggle}>
      <Dialog.Trigger asChild>{children}</Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Close />

        <Dialog.Header>
          <Dialog.Title>Add New Event</Dialog.Title>
          <Dialog.Description>Create a new event for your calendar.</Dialog.Description>
        </Dialog.Header>

        <Dialog.Body>
          <Form.Root {...form}>
            <form id="event-form" onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4">
              <Form.Field
                control={form.control}
                name="title"
                render={({ field, fieldState }) => (
                  <Form.Item>
                    <Form.Label htmlFor="title" required>
                      Title
                    </Form.Label>

                    <Form.Control>
                      <Input id="title" placeholder="Enter a title" data-invalid={fieldState.invalid} {...field} />
                    </Form.Control>

                    <Form.ErrorMessage />
                  </Form.Item>
                )}
              />

              <div className="flex items-start gap-2">
                <Form.Field
                  control={form.control}
                  name="startDate"
                  render={({ field, fieldState }) => (
                    <Form.Item className="flex-1">
                      <Form.Label htmlFor="startDate" required>
                        Start Date
                      </Form.Label>

                      <Form.Control>
                        <SingleDayPickerInput
                          id="startDate"
                          value={field.value}
                          onSelect={date => field.onChange(date as Date)}
                          placeholder="Select a date"
                          data-invalid={fieldState.invalid}
                        />
                      </Form.Control>

                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="startTime"
                  render={({ field, fieldState }) => (
                    <Form.Item className="flex-1">
                      <Form.Label required>Start Time</Form.Label>

                      <Form.Control>
                        <TimeInput value={field.value as TimeValue} onChange={field.onChange} hourCycle={12} data-invalid={fieldState.invalid} />
                      </Form.Control>

                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />
              </div>

              <div className="flex items-start gap-2">
                <Form.Field
                  control={form.control}
                  name="endDate"
                  render={({ field, fieldState }) => (
                    <Form.Item className="flex-1">
                      <Form.Label required>End Date</Form.Label>
                      <Form.Control>
                        <SingleDayPickerInput
                          value={field.value}
                          onSelect={date => field.onChange(date as Date)}
                          placeholder="Select a date"
                          data-invalid={fieldState.invalid}
                        />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />

                <Form.Field
                  control={form.control}
                  name="endTime"
                  render={({ field, fieldState }) => (
                    <Form.Item className="flex-1">
                      <Form.Label required>End Time</Form.Label>
                      <Form.Control>
                        <TimeInput value={field.value as TimeValue} onChange={field.onChange} hourCycle={12} data-invalid={fieldState.invalid} />
                      </Form.Control>
                      <Form.ErrorMessage />
                    </Form.Item>
                  )}
                />
              </div>

              <Form.Field
                control={form.control}
                name="variant"
                render={({ field, fieldState }) => (
                  <Form.Item>
                    <Form.Label required>Variant</Form.Label>
                    <Form.Control>
                      <Select.Root value={field.value} onValueChange={field.onChange}>
                        <Select.Trigger data-invalid={fieldState.invalid}>
                          <Select.Value placeholder="Select an option" />
                        </Select.Trigger>

                        <Select.Content>
                          <Select.Item value="blue">
                            <div className="flex items-center gap-2">
                              <div className="size-3.5 rounded-full bg-blue-600 dark:bg-blue-700" />
                              Blue
                            </div>
                          </Select.Item>

                          <Select.Item value="green">
                            <div className="flex items-center gap-2">
                              <div className="size-3.5 rounded-full bg-green-600 dark:bg-green-700" />
                              Green
                            </div>
                          </Select.Item>

                          <Select.Item value="red">
                            <div className="flex items-center gap-2">
                              <div className="size-3.5 rounded-full bg-red-600 dark:bg-red-700" />
                              Red
                            </div>
                          </Select.Item>

                          <Select.Item value="yellow">
                            <div className="flex items-center gap-2">
                              <div className="size-3.5 rounded-full bg-yellow-600 dark:bg-yellow-700" />
                              Yellow
                            </div>
                          </Select.Item>

                          <Select.Item value="purple">
                            <div className="flex items-center gap-2">
                              <div className="size-3.5 rounded-full bg-purple-600 dark:bg-purple-700" />
                              Purple
                            </div>
                          </Select.Item>

                          <Select.Item value="gray">
                            <div className="flex items-center gap-2">
                              <div className="size-3.5 rounded-full bg-gray-600 dark:bg-gray-700" />
                              Gray
                            </div>
                          </Select.Item>
                        </Select.Content>
                      </Select.Root>
                    </Form.Control>
                    <Form.ErrorMessage />
                  </Form.Item>
                )}
              />

              <Form.Field
                control={form.control}
                name="description"
                render={({ field, fieldState }) => (
                  <Form.Item>
                    <Form.Label>Description</Form.Label>

                    <Form.Control>
                      <Textarea {...field} value={field.value} data-invalid={fieldState.invalid} />
                    </Form.Control>

                    <Form.ErrorMessage />
                  </Form.Item>
                )}
              />
            </form>
          </Form.Root>
        </Dialog.Body>

        <Dialog.Footer>
          <Dialog.Close asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </Dialog.Close>

          <Button form="event-form" type="submit">
            Create Event
          </Button>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
}
