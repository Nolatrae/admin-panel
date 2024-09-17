import { Controller, type Control, type UseFormRegister } from 'react-hook-form'

import { Field } from '@/components/ui/field/Field'
import UploadField from '@/components/ui/upload-field/UploadField'
import type { IUserFormState } from '../user-form.types'

export function UserProfileFields({
	control,
	register,
}: {
	control: Control<IUserFormState, any>
	register: UseFormRegister<IUserFormState>
}) {
	return (
		<div className='grid min-lg:grid-cols-2 gap-8 mt-5'>
			<div>
				<Field {...register('country')} placeholder='Country' />
			</div>
			<div>
				<Controller
					control={control}
					name='avatarUrl'
					render={({ field: { onChange, value }, fieldState: { error } }) => (
						<UploadField
							onChange={onChange}
							value={value}
							error={error}
							folder='users'
							placeholder='Avatar'
						/>
					)}
				/>
			</div>
		</div>
	)
}
