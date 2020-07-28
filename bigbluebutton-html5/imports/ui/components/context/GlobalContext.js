import React, {Component} from "react";

/**
 * global context 생성
 *
 */
export const GlobalContext = React.createContext();

/**
 * global provider 생성
 * 동적 컨텍스트를 생성(setTermId 함수를 만들어, 외부에서 값을 전달받아 수정, state.termId createContext에서 초기)
 */
export class GlobalProvider extends Component {
    setTermId = process_id => {
        this.setState({ termId: process_id });
    };
    setMember = user_obj => {
        this.setState({ user: user_obj });
    };
    //화면에 보이는 코드
    setViewCode = view_code => {
        this.setState({codeInfo: view_code});
    }

    setHideVideo = isVideo => {
        this.setState({ isHideVideo: isVideo });
    };
    //이벤트 등록
    // setStartEvent = event_id => {
    // 	this.setState(
    // 		{
    // 			...this.state,
    // 			startStepId: event_id
    // 		}
    // 	);
    // }

    //스텝 초기화
    setInitStep = stepInfo => {
        this.setState({
            ...this.state,
            classInfo: stepInfo.classInfo,
            codeInfo: stepInfo.codeInfo,
            startStepId: stepInfo.startStepId,
        });
    }

    state = {
        isHideVideo: false,
        setHideVideo: this.setHideVideo,

    }
    render() {
        //let value = this.state;
        return (
            <GlobalContext.Provider value={this.state}>
            {this.props.children}
            </GlobalContext.Provider>
    )
    }
}

