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

    setHideVideo = isVideo => {
        this.setState({ isHideVideo: isVideo });
    };

    state = {
        isHideVideo: false,
        setHideVideo: this.setHideVideo,

    }
    render() {
        return (
            <GlobalContext.Provider value={this.state}>
            {this.props.children}
            </GlobalContext.Provider>
        )
    }
}

