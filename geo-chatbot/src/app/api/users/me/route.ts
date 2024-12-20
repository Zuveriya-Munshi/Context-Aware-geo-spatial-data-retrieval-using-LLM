import { connect } from '../../../../dbConfig/dbConfig';
import User from '../../../../models/userModel'
import { NextRequest , NextResponse } from 'next/server'
import { getDataFromtoken } from '../../../../helpers/getDataFromToken'


connect()

export async function POST(request: NextRequest){
    //extract data from token
     
    const userId = await getDataFromtoken(request)
    const user = await User.findOne({_id: userId}).select("-password")

    //check if there is no user
    return NextResponse.json({
        message: "User found",
        data: user
    })
}