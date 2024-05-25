"use client"

import * as z from 'zod'
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import {zodResolver} from '@hookform/resolvers/zod'

import { usePathname, useRouter } from 'next/navigation';
import { ThreadValidation } from "@/lib/validations/thread";
import { createThread } from '@/lib/actions/thread.action';
import { getPrediction } from '@/app/api/mlcheck';
// import { updateUser } from '@/lib/actions/user.actions';

interface Props{
    user:{
        id: string;
        objectId: string;
        username: string;
        name: string;
        bio: string;
        image: string;
    };
    btnTitle: string;
}

function PostThread({userId}: {userId: string}){

    const router = useRouter();
    const pathname = usePathname();

    const form = useForm({
        resolver: zodResolver(ThreadValidation),
        defaultValues: {
            thread: '',
            accountId: userId,
        }
    })

    const onSubmit = async(values: z.infer<typeof ThreadValidation>) =>{
        
      try{
      const prediction = await getPrediction(values.thread);
        
      console.log('Prediction:', prediction);
        
      await createThread({
            text: values.thread,
            author: userId,
            communityId: null,
            path: pathname, 
        }) 

        router.push('/')
      } catch(error){
        throw new Error('Network response was not ok');
      }
    }

    return (
       
            <Form {...form}>
          <form
            className='mt-10 flex flex-col justify-start gap-10'
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <FormField
          control={form.control}
          name='thread'
          render={({ field }) => (
            <FormItem className='flex w-full flex-col gap-3'>
              <FormLabel className='text-base-semibold text-light-2'>
                Content
              </FormLabel>
              <FormControl className='no-focus border border-darl-4 bg-dark-3 text-light-1'>
                <Textarea
                  rows={15}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className='bg-primary-500'>Post Thread</Button>

            </form>
            </Form>
            )
    
}

export default PostThread;