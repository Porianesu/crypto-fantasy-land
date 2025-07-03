import { observer } from 'mobx-react-lite'
import React from 'react'
import styles from './JoinWaitlistModal.module.css'
import {
  Content,
  Description,
  Dialog,
  Portal,
  Title,
  DialogOverlay,
  Close,
} from '@radix-ui/react-dialog'
import classNames from 'classnames'
import { useMobxStore } from '@/stores/StoreProvider.tsx'
import { Controller, useForm } from 'react-hook-form'

const JoinWaitlistModal: React.FC = () => {
  const {
    modalStore: { waitlistModalVisible, changeWaitlistModalVisible },
  } = useMobxStore()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: { name: '', email: '', note: '' },
  })

  const onSubmit = (data: any) => {
    // 这里可以处理表单提交逻辑
    console.log('表单数据:', data)
  }

  return (
    <Dialog open={waitlistModalVisible} onOpenChange={changeWaitlistModalVisible}>
      <Portal>
        <DialogOverlay
          className={classNames(
            'data-[state=open]:animate-fade-in data-[state=closed]:animate-fade-out',
            styles.overlay,
          )}
        >
          <Content className={styles.modalContent} onInteractOutside={(e) => e.preventDefault()}>
            <Close className={classNames('button', styles.closeButton)}></Close>
            <Title className={styles.modalTitle}>Join the Waitlist</Title>
            <Description className={styles.modalDescription}>
              Become one of the first to summon the legends.
            </Description>
            <form onSubmit={handleSubmit(onSubmit)} className={styles.formContainer}>
              <label htmlFor="name">
                Name:
                {errors.name && (
                  <span className={styles.formWarning}>{errors.name.message as string}</span>
                )}
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: 'Name is required',
                  minLength: { value: 2, message: 'Name must be at least 2 characters' },
                  maxLength: { value: 20, message: 'Name must be at most 20 characters' },
                }}
                render={({ field }) => (
                  <input id="name" placeholder={'Please enter your name.'} {...field} />
                )}
              />
              <label htmlFor="email">
                Email:
                {errors.email && (
                  <span className={styles.formWarning}>{errors.email.message as string}</span>
                )}
              </label>
              <Controller
                name="email"
                control={control}
                rules={{
                  required: 'Email is required',
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: 'Invalid email address',
                  },
                }}
                render={({ field }) => (
                  <input
                    id="email"
                    placeholder={'Please input your email address.'}
                    type="email"
                    {...field}
                  />
                )}
              />
              <label htmlFor="note">
                Note:
                {errors.note && (
                  <span className={styles.formWarning}>{errors.note.message as string}</span>
                )}
              </label>
              <Controller
                name="note"
                control={control}
                rules={{
                  maxLength: { value: 100, message: 'Note must be at most 100 characters' },
                }}
                render={({ field }) => (
                  <input id="note" placeholder={'Note (optional)'} {...field} />
                )}
              />
              <button type="submit" className={classNames('button', styles.submitButton)}>
                Submit
              </button>
            </form>
          </Content>
        </DialogOverlay>
      </Portal>
    </Dialog>
  )
}

export default observer(JoinWaitlistModal)
