
import {Checkbox, Label } from 'flowbite-react';

const CheckboxInput = () => {
    return (
        <div className="flex items-center gap-2">
          <Checkbox id="remember" color="purple" />
          <Label htmlFor="remember" className='text-white ms-2 text-sm font-medium'>Remember me</Label>
        </div>
    )
}
export default CheckboxInput